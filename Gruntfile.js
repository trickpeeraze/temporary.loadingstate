module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['src/enegist.loadingstate.js'],
				task: ['newer:browserify', 'newer:uglify'],
				options: {
					spawn: false
				}
			}
		},
		uglify: {
			main: {
				files: {
					'dest/enegist.loadingstate.min.js': ['src/enegist.loadingstate.js'],
					'dest/enegist.loadingstate.bundle.min.js': ['src/enegist.loadingstate.bundle.js']
				},
				options: {}
			}
		},
		browserify: {
			main: {
				files: {
					'src/enegist.loadingstate.bundle.js': ['src/enegist.loadingstate.js']
				},
				options: {}
			}
		}
	});
	
	grunt.registerTask('build', ['browserify', 'uglify']);
	grunt.registerTask('default', ['watch']);

};