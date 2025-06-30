export default {
    methods: {
        validateSelectBinding(modelKey, options, matchKey) {
            const value = this.$get(this, modelKey)
            const exist = options.find(opt => opt[matchKey] === value)
            if (!exist) { this.$set(this, modelKey, "") }
        }
    }
}