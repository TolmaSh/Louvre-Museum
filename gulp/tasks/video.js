import config from '../config';
import gulp from 'gulp';
const video = (cb) => {
	gulp.src(config.src.video)
	.pipe(gulp.dest(config.build.video))
cb()
}

export default video;