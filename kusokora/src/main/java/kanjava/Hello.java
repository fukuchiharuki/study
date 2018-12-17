package kanjava;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Component
public class Hello {
    private static final Logger log = LoggerFactory.getLogger(Hello.class);

    @JmsListener(destination = "hello", concurrency = "1-5")
    void handleHelloMessage(Message<String> message) {
        log.info("received! {}", message);
        log.info("msg={}", message.getPayload());
    }
}