<template>
  <div :class="`input-top-tip input-top-tip-${id}`">
    <slot />
    <label class="input-label" :style="{ top: top + 'px', height: height + 'px', zoom: zoom }" v-if="visible">{{ placeholder }}</label>
  </div>
  <!-- 组件使用 -->
  <!-- <InputTopTip v-model="filter_form.name" placeholder="学校名字">
    <el-input
      style="width: 220px;"
      placeholder=""
      @keyup.native.enter="refreshDataListBefore()"
      v-model="filter_form.name"
      size="small"
    >
    </el-input>
  </InputTopTip> -->
</template>
  
<script>
import { isEmpty, last } from 'lodash'
export default {
  model: {
    prop: 'value'
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    // 可能会被外部样式干扰，可手动调
    marginTop: {
      type: Number,
      default: 16
    },
    value: {
      default: ''
    }
  },
  data() {
    return {
      id: '',
      top: 0,
      height: 10,
      visible: true,
      timer: null,
      num: 10,
      zoom: 1,
      focus: false
    }
  },
  watch: {
    value: {
      handler(val) {
        if ((typeof val == 'object' && !isEmpty(val)) || this.focus || (typeof val != 'object' && val !== '')) {
          this.top = -17 + this.marginTop
          this.zoom = 0.76
        } else {
          this.top = this.marginTop
          this.zoom = 1
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getUUID() {
      const tempURL = URL.createObjectURL(new Blob())
      const uuid = tempURL.toString()
      URL.revokeObjectURL(tempURL)
      return last(uuid.split('/'))
    },
    updateInput(element) {
      let event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(event);
    }
  },
  created() {
    this.id = this.getUUID()
  },
  mounted() {
    let inputElements = document.querySelectorAll(`.input-top-tip-${this.id} input`);
    inputElements.forEach((input) => {
      input.addEventListener('focus', () => {
        this.focus = true
        clearInterval(this.timer)
        this.top = -17 + this.marginTop
        this.zoom = 0.76
        // console.log('输入框获得焦点');
      });
      input.addEventListener('blur', () => {
        this.focus = false
        if ((typeof this.value == 'object' && isEmpty(this.value)) || (typeof this.value != 'object' && this.value === '')) {
          this.top = this.marginTop
          this.zoom = 1
        }
      });
    });
  },
}
</script>

<style scoped>
.input-top-tip {
  position: relative;
}

.input-label {
  position: absolute;
  transition: 0.3s;
  left: 10px;
  pointer-events: none;
  color: #cccccc;
  z-index: 888;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0 10px;
}

</style>
