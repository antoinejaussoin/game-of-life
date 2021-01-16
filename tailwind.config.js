const production = false;

module.exports = {
  purge: {
    content: ["./src/**/*.svelte"],
    enabled: production,
  },
  theme: {
    extend: {
      // colors: {
      //   orange: {
      //     500: "#ff3e00",
      //   },
      // },
    },
  },
  variants: {},
  plugins: [],
  future: {
    // purgeLayersByDefault: true,
    // removeDeprecatedGapUtilities: true,
  },
};
