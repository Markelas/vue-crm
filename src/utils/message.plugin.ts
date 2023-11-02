declare const M: { toast: (arg0: { html: string; }) => void; } // Декларация M из библиотеки Materialize
export default {
  install (Vue: { prototype: { $message: (html: string) => void; $error: (html: string) => void } }, options: any) {
    Vue.prototype.$message = function (html) {
      M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      M.toast({ html: `[Error]: ${html}` })
    }
  }
}
