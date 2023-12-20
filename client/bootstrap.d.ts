declare namespace bootstrap {
  // https://getbootstrap.com/docs/5.3/components/modal/#how-it-works
  declare class Modal {
    constructor(el: HTMLElement);
    show(): void;
    hide(): void;
    dispose(): void;
  }
}
