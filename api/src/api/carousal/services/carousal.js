'use strict';

/**
 * carousal service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::carousal.carousal');
