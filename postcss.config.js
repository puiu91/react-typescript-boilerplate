module.exports = {
  plugins: {
    autoprefixer: {
      flexbox: 'no-2009', // will add prefixes only for final and ie versions of specification
      browsers: [
        'ie >= 11',
        'last 2 versions',
        'and_chr >= 2.3' // required for Foundation 6.3.1
      ]
    }
  }
}
