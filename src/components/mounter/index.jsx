import ReactDOM from "react-dom";
import React from "react";

const defaultKey = "material-mounter";

export class Mounter {
  // key = defaultKey;
  dom = null;
  Comp = null;
  defaultProps = {};
  constructor(key = defaultKey, Comp, defaultProps) {
    const oldDom = document.getElementById(key);
    this.defaultProps = defaultProps;
    if (oldDom) {
      // eslint-disable-next-line no-console
      console.warn("the mounter key aready be used");
      this.dom = oldDom;
    } else {
      const dom = document.createElement("div");
      dom.id = key;
      this.dom = dom;
    }
    document.body.appendChild(this.dom);
    this.Comp = Comp;
  }

  mount(props = {}) {
    if (this.Comp && this.dom) {
      const elem = React.createElement(this.Comp, {
        ...props,
        ...this.defaultProps,
      });
      ReactDOM.render(elem, this.dom);
    }
  }

  unmount() {
    if (this.Comp && this.dom) {
      ReactDOM.unmountComponentAtNode(this.dom);
    }
  }
}

export class MounterElement extends Mounter {
  constructor(key, element) {
    super(key, () => element);
  }
}
