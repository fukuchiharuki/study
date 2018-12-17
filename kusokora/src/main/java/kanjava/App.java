package kanjava;

import org.bytedeco.javacpp.opencv_core;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
@RestController
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    private static final Logger log = LoggerFactory.getLogger(App.class);

    // FaceDetectorをインジェクション
    @Autowired
    FaceDetector faceDetector;

    // メッセージ操作用APIのJMSラッパー
    @Autowired
    JmsMessagingTemplate jmsMessagingTemplate;

    @RequestMapping(value = "/")
    String hello() {
        return "Hello World!";
    }

    // curl -v -F 'file=@hoge.jpg' http://localhost:8080/duker > after.jpg という風に使えるようにする
    // POSTで/dukerへのリクエストに対する処理
    @RequestMapping(value = "/duker", method = RequestMethod.POST)
    BufferedImage duker(
            /* パラメータ名fileのマルチパートリクエストのパラメータを取得 */
            @RequestParam Part file
    ) throws IOException {
        // Part -> BufferedImage -> Matと変換
        opencv_core.Mat source = opencv_core.Mat.createFrom(ImageIO.read(file.getInputStream()));
        // 対象のMatに対して顔認識。認識結果に対してduker関数を適用する。
        faceDetector.detectFaces(source, FaceTranslator::duker);
        // Mat -> BufferedImage
        return source.getBufferedImage();
    }

    @RequestMapping(value = "/send")
    String send(
            @RequestParam String msg
    ) {
        Message message = MessageBuilder
                .withPayload(msg)
                .build();
        jmsMessagingTemplate.send("hello", message);
        return "OK";
    }

    //@JmsListener(destination = "hello", concurrency = "1-5")
    //void handleHelloMessage(Message<String> message) {
    //    log.info("received! {}", message);
    //    log.info("msg={}", message.getPayload());
    //}

    @RequestMapping(value = "/queue")
    String queue(
            @RequestParam Part file
    ) throws IOException {
        byte[] src = StreamUtils.copyToByteArray(file.getInputStream());
        Message<byte[]> message = MessageBuilder.withPayload(src).build();
        jmsMessagingTemplate.send("faceConverter", message);
        return "OK";
    }

    @JmsListener(destination = "faceConverter", concurrency = "1-5")
    void convertFaces(Message<byte[]> message) throws IOException {
        try (InputStream stream = new ByteArrayInputStream(message.getPayload())) {
            opencv_core.Mat source = opencv_core.Mat.createFrom(ImageIO.read(stream));
            faceDetector.detectFaces(source, FaceTranslator::duker);
            BufferedImage image = source.getBufferedImage();
            // do nothing
        }
    }

    @MessageMapping(value = "/greet")
    @SendTo(value = "/topic/greetings")
    String greet(String name) {
        log.info("received {}", name);
        return "Hello " + name;
    }
}