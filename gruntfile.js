module.exports = function(grunt) {
	grunt.initConfig({  
		path: require('path'),
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				} // close .globals
			}, // close .options
			gruntfile: {
				src: ['gruntfile.js'],
			},
			sourceFiles: {
				src: ['src<%= path.sep %>js<%= path.sep %>*.js'],
			}
		}, // close jshint
		less: {
			options: {},
			build: {
				files: {
					"src<%= path.sep %>css<%= path.sep %>default.css": "src<%= path.sep %>less<%= path.sep %>cmv<%= path.sep %>default.less"
				}
			}
		}, // close less
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['src<%= path.sep %>css<%= path.sep %>*.css']
			}
		}, // close csslint
		cssmin: {
			build: {
				files: {
					'wwwroot<%= path.sep %>includes<%= path.sep %>css<%= path.sep %>default.min.css':['src<%= path.sep %>css<%= path.sep %>default.css','!src<%= path.sep %>css<%= path.sep %>*.min.css']
				}
			}
		}, // close cssmin
		uglify: {
			sourceFiles: {
				files: [{
					expand: true,
					cwd: 'src<%= path.sep %>js<%= path.sep %>',
					src: '**<%= path.sep %>*.js',
					dest: 'wwwroot<%= path.sep %>includes<%= path.sep %>js'
				}]
			}
		}, // close uglify
		'ftp-deploy': {
			push: {
				auth: {
					host: 'ftp.christophervachon.com',
					port: 21,
					authKey: 'key1'
				},
				src: '',
				dest: 'subdomains/presentor/',
				exclusions: ['.vagrant/*','bower_components/*','elements/*','node_moules/*','references/*']
			},
			scriptsOnly: {
				auth: {
					host: 'ftp.christophervachon.com',
					port: 21,
					authKey: 'key1'
				},
				src: '',
				dest: 'subdomains/presentor/',
				exclusions: ['.vagrant/*','bower_components/*','elements/*','node_moules/*','references/*']
			},
			decksOnly: {
				auth: {
					host: 'ftp.christophervachon.com',
					port: 21,
					authKey: 'key1'
				},
				src: 'wwwroot/',
				dest: 'subdomains/presentor/',
				exclusions: ['bower_components/*','elements/*','**/*.jade']
			}
		},
		http: {
			reload: {
				options: {
					url: 'http://christophervachon.com/?reload=true',
				},
			}
		},
		jade: {
			options: {
				pretty: true
			},
			file: {},
			compile: {
				src: "jade/test.jade",
				dest: "jade/test.html"
			}
		},
		watch: {
			gruntfile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:gruntfile'],
				options: {
					spawn: false
				}
			}, // close gruntfile
			less: {
				files: ['src<%= path.sep %>less<%= path.sep %>*.less'],
				tasks: ['less:build','cssmin:build'], //,'csslint:strict' -- csslint dosnt play well with bootstrap
				options: {
					spawn: false
				}
			}, // close less
			jsfiles: {
				files: ['src<%= path.sep %>js<%= path.sep %>*.js'],
				tasks: ['jshint:sourceFiles','uglify:sourceFiles'],
				options: {
					spawn: false
				}
			}, // close jsfiles
			jade: {
				files: ['src/jade/**/*.jade','!src/jade/includes/**/*.jade'],
				tasks: ['jade:file'],
				options: {
					spawn: false
				}
			}
		} // close watch
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-http');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('deploy', ['ftp-deploy:push','http:reload']);
	grunt.registerTask('deployScripts',['ftp-deploy:scriptsOnly','http:reload']);

	grunt.event.on("watch", function(action, filepath, target) {
		if (target == 'jade') {
			grunt.log.writeln("JADE!!! --> " + target + ': ' + filepath + ' has ' + action);
			grunt.config.set("jade.file.src", filepath);
			grunt.config.set("jade.file.dest", filepath.replace(/\.jade/gi,".html").replace(/(?:.+(?:\/|\\))jade/gi,"wwwroot"));
		} else if (target == 'less') {
			grunt.log.writeln("LESS!!! --> " + target + ': ' + filepath + ' has ' + action);
			var cssfilepath = filepath.replace(/\.less/gi,".css").replace(/less/gi,"css");
			grunt.config.set("less.build.src", filepath);
			grunt.config.set("less.build.dest", cssfilepath);
			grunt.config.set("cssmin.build.src", cssfilepath);
			grunt.config.set("cssmin.build.dest", cssfilepath.replace(/.+\/(\w+\.\w+)$/gi,'wwwroot/includes/css/$1').replace(/\.css$/gi,".min.css"));
		} // close if target...
	}); // close grunt.event.on("watch")
}; // close module.exports
