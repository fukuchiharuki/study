package kanjava;

import org.bytedeco.javacpp.opencv_core;

import static org.bytedeco.javacpp.opencv_core.CV_AA;
import static org.bytedeco.javacpp.opencv_core.circle;
import static org.bytedeco.javacpp.opencv_core.rectangle;

public class FaceTranslator {
    public static void duker(
            opencv_core.Mat source,
            opencv_core.Rect r
    ) {
        int x = r.x(), y = r.y(), h = r.height(), w = r.width();
        // Dukeのように描画する
        // 上半分の黒四角
        rectangle(source, new opencv_core.Point(x, y), new opencv_core.Point(x + w, y + h / 2),
                new opencv_core.Scalar(0, 0, 0, 0), -1, CV_AA, 0);
        // 下半分の白四角
        rectangle(source, new opencv_core.Point(x, y + h / 2), new opencv_core.Point(x + w, y + h),
                new opencv_core.Scalar(255, 255, 255, 0), -1, CV_AA, 0);
        // 中央の赤丸
        circle(source, new opencv_core.Point(x + h / 2, y + h / 2), (w + h) / 12,
                new opencv_core.Scalar(0, 0, 255, 0), -1, CV_AA, 0);
    }
}
