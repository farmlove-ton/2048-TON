import WebApp from "@twa-dev/sdk";

export const initWebApp = () => {
  WebApp.ready();
  WebApp.BackButton.onClick(() => {
    window.history.back();
  });
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
