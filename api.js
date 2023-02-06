const TOPIC = "secure-password-manager-extension";

this.credentials = class extends ExtensionAPI {
  getAPI(context) {
    let EventManager = ExtensionCommon.EventManager;

    return {
      experiments: {
        credentials: {
          onPassword: new EventManager({
            context,
            name: "experiments.credentials.onPassword",
            register: (fire) => {
              let observer = (value) => {
                fire.sync(value);
              };
              Services.obs.addObserver(observer, TOPIC);
              return () => {
                Services.obs.removeObserver(observer, TOPIC);
              };
            },
          }).api(),
        },
      },
    };
  }
};
