export default {
    ensure: (callback: any) => {
        require.ensure(["./index"], (require: any) => {
            callback(require("./index"));
        });
    }
};
