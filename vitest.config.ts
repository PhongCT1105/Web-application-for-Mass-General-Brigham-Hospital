import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  test: {
    api: {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
      port:  parseInt(<string>process.env["FROUNTEND_PORT"]),
      host: "0.0.0.0",
    },
  },
});
