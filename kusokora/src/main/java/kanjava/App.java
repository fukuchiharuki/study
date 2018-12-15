package kanjava;

import org.bytedeco.javacpp.opencv_core;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import java.io.IOException;

@SpringBootApplication
@RestController
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    // FaceDetectorをインジェクション
    @Autowired
    FaceDetector faceDetector;

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
}