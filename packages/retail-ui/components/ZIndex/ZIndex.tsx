import * as React from 'react';
import createReactContext from 'create-react-context';

const ZIndexContext = createReactContext(0);

type LayerComponentName = 'Loader' | 'Modal' | 'ModalHeader' | 'ModalFooter' | 'DropdownContainer' | 'Popup';
export interface ZIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Приращение к z-index
   */
  delta: number;
  priority: number | LayerComponentName;
  shouldThrowZIndex: boolean;
  style: React.CSSProperties;
  render?: boolean;
  shouldCreateStackingContext?: boolean;
  className?: string;
}

export default class ZIndex extends React.Component<ZIndexProps> {
  public static defaultProps = {
    render: true,
    delta: 10,
    priority: 0,
    style: {},
    shouldThrowZIndex: true,
    shouldCreateStackingContext: false,
  };

  private zIndex: number = 0;

  constructor(props: ZIndexProps) {
    super(props);
    this.zIndex = ZIndexStorage.incrementZIndex(props.priority, props.delta);
  }

  public componentWillUnmount() {
    ZIndexStorage.removeZIndex(this.zIndex);
  }

  public render(): JSX.Element {
    const {
      render,
      style,
      children,
      delta,
      priority,
      shouldThrowZIndex,
      shouldCreateStackingContext,
      ...props
    } = this.props;
    if (shouldCreateStackingContext) {
      'isolation' in document.body.style ? (style.isolation = 'isolate') : (style.transform = 'rotate(0)');
    }
    return (render ? (
      <ZIndexContext.Consumer>
        {parentLayerZIndex => {
          const summaryZIndex = this.zIndex + parentLayerZIndex;
          return (
            <div style={{ ...style, zIndex: summaryZIndex }} {...props}>
              <ZIndexContext.Provider value={this.props.shouldThrowZIndex ? summaryZIndex : 0}>
                {children}
              </ZIndexContext.Provider>
            </div>
          );
        }}
      </ZIndexContext.Consumer>
    ) : (
      children
    )) as JSX.Element;
  }
}

export class ZIndexStorage {
  public static incrementZIndex = (priority: number | LayerComponentName, delta: number): number => {
    if (delta <= 0) {
      throw new Error();
    }

    if (typeof priority === 'string') {
      priority = ZIndexStorage.componentPriorities[priority];
    }

    const maxAllowedValue = (priority + 1) * ZIndexStorage.priorityStep - 1;
    const zIndexes = ZIndexStorage.getZIndexes();

    let prevIndexId = 0;
    while (zIndexes[prevIndexId] <= maxAllowedValue && prevIndexId < zIndexes.length) {
      prevIndexId++;
    }

    const zIndex =
      ZIndexStorage.getIndexPriority(zIndexes[prevIndexId]) === priority
        ? Math.min(zIndexes[prevIndexId] + delta, maxAllowedValue)
        : priority * ZIndexStorage.priorityStep;

    zIndexes.push(zIndex);
    zIndexes.sort((a, b) => a - b);
    return zIndex;
  };

  public static removeZIndex = (zIndex: number): void => {
    const zIndexes = ZIndexStorage.getZIndexes();
    const i = zIndexes.indexOf(zIndex);
    zIndexes.splice(i, 1);
  };

  private static componentPriorities = {
    Loader: 10,
    Modal: 7,
    ModalHeader: 5,
    ModalFooter: 5,
    DropdownContainer: 3,
    Popup: 1,
  };

  private static priorityStep = 1000;
  private static getIndexPriority = (zIndex: number) => Math.trunc(zIndex / ZIndexStorage.priorityStep);

  private static getZIndexes = (): number[] => {
    return window.__RetailUiZIndexes || (window.__RetailUiZIndexes = [0]);
  };
}
