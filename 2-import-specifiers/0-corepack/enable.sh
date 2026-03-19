# This will replace those package managers on your system with a shim
# that prevents you from running a package manager that doesn't match the
# `packageManager` setting in your package.json file.
# Corepack can also install the corresponding package manager version.

# This enables corepack for yarn and pnpm
corepack enable

# This enables corepack for npm,
# which corepack usually doesn't handle
# because it's bundled with node.
corepack enable npm
# This command is not simple to reverse,
# but LLMs know how to fix the symlinks
# if you really need to reverse this.
