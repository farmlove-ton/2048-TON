import WebApp from "@twa-dev/sdk";

export const initWebApp = () => {
  WebApp.ready();
  WebApp.BackButton.onClick(() => {
    window.history.back();
  });

  WebApp.setHeaderColor("#1A1A1A");
};

export const showBackButton = () => {
  WebApp.BackButton.show();
};

export const hideBackButton = () => {
  WebApp.BackButton.hide();
};

export const getUserData = () => {
  return WebApp.initDataUnsafe.user;
};

export const getInitData = () => {
  return WebApp.initData;
};

export const openChat = (username: string) => {
  return WebApp.openTelegramLink(`https://t.me/${username}`);
};
