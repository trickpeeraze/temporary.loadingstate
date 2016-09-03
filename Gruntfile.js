module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['src/temporary.loadingstate.js'],
				task: ['newer:browserify', 'newer:uglify'],
				options: {
					spawn: false
				}
			}
		},
		uglify: {
			main: {
				files: {
					'dest/temporary.loadingstate.min.js': ['src/temporary.loadingstate.js'],
					'dest/temporary.loadingstate.bundle.min.js': ['src/temporary.loadingstate.bundle.js']
				},
				options: {}
			}
		},
		browserify: {
			main: {
				files: {
					'src/temporary.loadingstate.bundle.js': ['src/temporary.loadingstate.js']
				},
				options: {}
			}
		}
	});
	
	grunt.registerTask('build', ['browserify', 'uglify']);
	grunt.registerTask('default', ['watch']);

};