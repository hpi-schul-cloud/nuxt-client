[HPM] Proxy created: /  -> http://localhost:3100
[HPM] Proxy created: /  -> http://localhost:3030
[HPM] Proxy created: /  -> http://localhost:4444
[HPM] Proxy created: /  -> http://localhost:4448
{
  mode: 'development',
  context: '/Users/uwe/code/schulcloud/nuxt-client',
  output: {
    hashFunction: 'xxhash64',
    path: '/Users/uwe/code/schulcloud/nuxt-client/dist',
    filename: '_nuxt/js/[name].js',
    publicPath: '/',
    chunkFilename: '_nuxt/js/[name].js'
  },
  resolve: {
    alias: {
      '@': '/Users/uwe/code/schulcloud/nuxt-client/src',
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@data-board': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-board',
      '@data-external-tool': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-external-tool',
      '@data-group': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-group',
      '@data-system': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-system',
      '@data-provisioning-options': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-provisioning-options',
      '@data-room': '/Users/uwe/code/schulcloud/nuxt-client/src/components/data-room',
      '@feature-board-file-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-file-element',
      '@feature-board-submission-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-submission-element',
      '@feature-board-text-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-text-element',
      '@feature-board-link-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-link-element',
      '@feature-board-external-tool-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-external-tool-element',
      '@feature-board-drawing-element': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board-drawing-element',
      '@feature-board': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-board',
      '@feature-course-sync': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-course-sync',
      '@feature-editor': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-editor',
      '@feature-render-html': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-render-html',
      '@feature-news-form': '/Users/uwe/code/schulcloud/nuxt-client/src/components/feature-news-form',
      '@ui-alert': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-alert',
      '@ui-board': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-board',
      '@ui-preview-image': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-preview-image',
      '@ui-confirmation-dialog': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-confirmation-dialog',
      '@ui-date-time-picker': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-date-time-picker',
      '@ui-light-box': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-light-box',
      '@ui-speed-dial-menu': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-speed-dial-menu',
      '@ui-room-details': '/Users/uwe/code/schulcloud/nuxt-client/src/components/ui-room-details',
      '@util-board': '/Users/uwe/code/schulcloud/nuxt-client/src/components/util-board',
      '@util-validators': '/Users/uwe/code/schulcloud/nuxt-client/src/components/util-validators',
      '@util-vue': '/Users/uwe/code/schulcloud/nuxt-client/src/components/util-vue',
      '@util-input-masks': '/Users/uwe/code/schulcloud/nuxt-client/src/components/util-input-masks',
      '@util-device-detection': '/Users/uwe/code/schulcloud/nuxt-client/src/components/util-device-detection',
      '@page-board': '/Users/uwe/code/schulcloud/nuxt-client/src/components/page-board',
      '@page-class-members': '/Users/uwe/code/schulcloud/nuxt-client/src/components/page-class-members'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.js',
      '.ts',
      '.vue',
      '.json'
    ],
    modules: [
      'node_modules',
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules',
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        dirname: '/Users/uwe/code/schulcloud/nuxt-client',
        replacements: []
      }
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules',
      '/Users/uwe/code/schulcloud/nuxt-client/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('esm') */
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-loader/dist/index.js',
            options: {
              cacheDirectory: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/.cache/vue-loader',
              cacheIdentifier: '25f723db',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ],
              prettify: false,
              compilerOptions: {
                isCustomElement: (tag) => tag.startsWith("h5p-")
              }
            }
          }
        ]
      },
      /* config.module.rule('vue-style') */
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: '_nuxt/img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: '_nuxt/img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: '_nuxt/media/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: '_nuxt/fonts/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/babel-loader/lib/index.js',
            options: {
              cacheCompression: false,
              cacheDirectory: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/.cache/babel-loader',
              cacheIdentifier: '4e863064'
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/babel-loader/lib/index.js'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false,
              configFile: '/Users/uwe/code/schulcloud/nuxt-client/tsconfig.build.json'
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          /* config.module.rule('tsx').use('babel-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/babel-loader/lib/index.js'
          },
          /* config.module.rule('tsx').use('ts-loader') */
          {
            loader: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        type: 'javascript/auto',
        loader: '/Users/uwe/code/schulcloud/nuxt-client/webpack-config/vue-i18n-loader.js',
        include: [
          '/Users/uwe/code/schulcloud/nuxt-client/src/locales'
        ]
      }
    ]
  },
  optimization: {
    realContentHash: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new Plugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'Deine digitale Lernumgebung',
        scriptLoading: 'defer',
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/uwe/code/schulcloud/nuxt-client/public/index.html',
        favicon: './public/themes/default/favicon.png'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      {
        patterns: [
          {
            from: '/Users/uwe/code/schulcloud/nuxt-client/public',
            to: '/Users/uwe/code/schulcloud/nuxt-client/dist',
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: [
                '**/.DS_Store',
                '/Users/uwe/code/schulcloud/nuxt-client/public/index.html',
                '/Users/uwe/code/schulcloud/nuxt-client/public/themes/**/*'
              ]
            },
            info: {
              minimized: true
            }
          }
        ]
      }
    ),
    /* config.plugin('eslint') */
    new ESLintWebpackPlugin(
      {
        extensions: [
          '.js',
          '.jsx',
          '.vue',
          '.ts',
          '.tsx'
        ],
        cwd: '/Users/uwe/code/schulcloud/nuxt-client',
        cache: true,
        cacheLocation: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/.cache/eslint/7c2c4af2.json',
        context: '/Users/uwe/code/schulcloud/nuxt-client',
        failOnWarning: false,
        failOnError: true,
        eslintPath: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/eslint',
        formatter: 'stylish'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: '/Users/uwe/code/schulcloud/nuxt-client/node_modules/vue/compiler-sfc/index.js'
            }
          },
          diagnosticOptions: {
            semantic: true,
            syntactic: false
          },
          configFile: '/Users/uwe/code/schulcloud/nuxt-client/tsconfig.build.json'
        }
      }
    ),
    {
      options: {
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss'
        },
        stylesTimeout: 10000
      }
    },
    {}
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  }
}
