import type { PropType, Slot } from 'vue';
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconMore from '../icon/icon-more';
import IconObliqueLine from '../icon/icon-oblique-line';

export default defineComponent({
  name: 'BreadcrumbItem',
  inheritAttrs: false,
  // private
  props: {
    total: {
      type: Number,
      default: 0,
    },
    maxCount: {
      type: Number,
      default: 0,
    },
    separator: {
      type: Function as PropType<Slot>,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('breadcrumb-item');

    const show = computed(() => {
      if (props.maxCount > 0 && props.total > props.maxCount + 1) {
        if (props.index > 1 && props.index <= props.total - props.maxCount) {
          return false;
        }
      }
      return true;
    });

    const displayMore = computed(() => {
      if (props.maxCount > 0 && props.total > props.maxCount + 1) {
        if (props.index === 1) {
          return true;
        }
      }
      return false;
    });

    return () => {
      if (show.value) {
        return (
          <>
            <div class={prefixCls} {...attrs}>
              {displayMore.value ? <IconMore /> : slots.default?.() ?? ''}
            </div>
            {props.index !== props.total - 1 && (
              <div class={`${prefixCls}-separator`}>
                {props.separator?.() ?? <IconObliqueLine />}
              </div>
            )}
          </>
        );
      }
      return null;
    };
  },
});
