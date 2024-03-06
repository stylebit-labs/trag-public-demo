import { createLogger, format, transports } from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";

const loggingWinston = new LoggingWinston();

const gCloudLogger = createLogger({
	format: format.combine(format.splat(), format.simple()),
	transports: [
		new transports.Console(),
		...(process.env.CLOUD_ENV === "gcp" ? [loggingWinston] : []),
	],
});

const logger = {
	info: (...logData: unknown[]): void => {
		gCloudLogger.info(logData);
	},

	debug: (...logData: unknown[]): void => {
		gCloudLogger.debug(logData);
	},

	log: (...logData: unknown[]): void => {
		gCloudLogger.info(logData);
	},

	error: (...logData: unknown[]): void => {
		gCloudLogger.error(logData);
	},

	warn: (...logData: unknown[]): void => {
		gCloudLogger.warn(logData);
	},
};

export default logger;
