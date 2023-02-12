const TOPIC = "secure-credential-provision";

this.credentials = class extends ExtensionAPI {
  getAPI(context) {
    let EventManager = ExtensionCommon.EventManager;

    return {
      experiments: {
        credentials: {
          onCredentialInfos: new EventManager({
            context,
            name: "experiments.credentials.onCredentialInfos",
            register: (fire) => {
              let observer = (subject, topic, pw) => {
                fire.async(pw);
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
