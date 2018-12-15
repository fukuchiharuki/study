package kanjava;

import org.bytedeco.javacpp.opencv_core;
import org.bytedeco.javacpp.opencv_objdetect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.function.BiConsumer;

@Component
public class FaceDetector {
    // 分類器のパスをプロパティから取得できるようにする
    @Value("${classifierFile:classpath:/haarcascade_frontalface_default.xml}")
    File classifierFile;

    opencv_objdetect.CascadeClassifier classifier;

    static final Logger log = LoggerFactory.getLogger(FaceDetector.class);

    public void detectFaces(
            opencv_core.Mat source,
            BiConsumer<opencv_core.Mat, opencv_core.Rect> detectAction
    ) {
        // 顔認識結果
        opencv_core.Rect faceDetections = new opencv_core.Rect();
        // 顔認識実行
        classifier.detectMultiScale(source, faceDetections);
        // 認識した顔の数
        int numOfFaces = faceDetections.limit();
        log.info("{} faces are detected!", numOfFaces);
        for (int i = 0; i < numOfFaces; i++) {
            // i番目の認識結果
            opencv_core.Rect r = faceDetections.position(i);
            // 1件ごとの認識結果を変換処理(関数)にかける
            detectAction.accept(source, r);
        }
    }

    // 初期化処理。DIでプロパティがセットされたあとにclassifierインスタンスを生成したいのでここで書く。
    @PostConstruct
    void init() throws IOException {
        if (log.isInfoEnabled()) {
            log.info("load {}", classifierFile.toPath());
        }
        // 分類器の読み込み
        this.classifier =
                new opencv_objdetect.CascadeClassifier(classifierFile.toPath().toString());
    }
}
