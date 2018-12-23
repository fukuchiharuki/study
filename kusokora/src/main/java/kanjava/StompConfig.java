package kanjava;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class StompConfig extends AbstractWebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("endpoint");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry messageBrokerRegistry) {
        // controllerに処理させる分
        messageBrokerRegistry.setApplicationDestinationPrefixes("/app");
        // topicを有効にする
        messageBrokerRegistry.enableSimpleBroker("/topic");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration webSocketTransportRegistration) {
        // メッセージサイズの上限を10MBにする
        webSocketTransportRegistration.setMessageSizeLimit(10 * 1024 * 1024);
    }
}
