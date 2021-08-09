import { Mounter } from ".";
import { Snackbar } from "@material-ui/core";

export class MessageMounter {
  mounter = new Mounter("material-message", Snackbar, {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    open: true,
  });
  timer = null;
  open(message) {
    this.mounter.mount({ message });
    if(this.timer) {
      clearTimeout(this.timer);
    }
    setTimeout(() => {
      this.close();
    }, 5000)
  }
  close() {
    this.mounter.unmount();
  }
}

const messageMounter = new MessageMounter();

export default messageMounter;
