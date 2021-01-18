const production = process.env.NODE_ENV === "production";

module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./node_modules/@fouita/**/*.js"],
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
