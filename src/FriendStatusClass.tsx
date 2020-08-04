import React, { Fragment } from 'react';
import ChatAPI from './ChatAPI';

interface Props {
  friend: { id: string };
}

class FriendStatusClass extends React.Component<Props, { isOnline: boolean | null }> {
  state = {
    isOnline: null,
  };

  handleStatusChange = (status: { isOnline: boolean }) => {
    const { isOnline } = status;
    this.setState({ isOnline });
  };

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  componentDidUpdate(prevProps: Props) {
    // propsで受け取るfriend.idが変更される可能性がある
    // のでcomponentWillUnmountだけのクリーンアップだけでは不充分
    if (this.props.friend.id === prevProps.friend.id) return;
    ChatAPI.unsubscribeFromFriendStatus(prevProps.friend.id, this.handleStatusChange);
    ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id, this.handleStatusChange);
  }

  render() {
    const { isOnline } = this.state;
    const status = (isOnline === null)
      ? "Loading..."
      : isOnline ? "Online" : "Offline";
    return <Fragment>{status}</Fragment>;
  }
}

export default FriendStatusClass;