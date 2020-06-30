<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */


// Ensure our urls have the right scheme
define('URI_SCHEME', getenv('FORCE_SSL') ? "https://" : "http://" );

define('SITE_URL', URI_SCHEME . getenv('DEFAULT_SITE_URL') . '/');

return [
    // Global settings
    '*' => [


        /**
         * Schema
         */

        'useProjectConfigFile' => true,

        /**
         * Routing / URLs
         */

        // Base site URL
        'siteUrl' => SITE_URL,
        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,
        'usePathInfo'       => true,
        // Manage our routes in the craft/config/routes.php file
        'siteRoutesSource'   => 'file',
        // Control Panel trigger word
        'cpTrigger' => 'manage',

        /**
         * Debugging
         */

        'isSystemLive' => filter_var(getenv('CRAFT_LIVE'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true,
        'devMode' => filter_var(getenv('CRAFT_DEBUG'), FILTER_VALIDATE_BOOLEAN),

        'testToEmailAddress' => getenv('CRAFT_CATCH_ALL_EMAIL_ADDRESS') ?: null,
        /**
         * Caching
         */


        'enableTemplateCaching' => filter_var(getenv('CRAFT_CACHE_ENABLED'), FILTER_VALIDATE_BOOLEAN),

        // Whether Craft should cache element queries that fall inside {% cache %} tags.
        'cacheElementQueries' => filter_var(getenv('CRAFT_CACHE_ENABLED'), FILTER_VALIDATE_BOOLEAN),

        /**
         * Security
         */
        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),
        // Enable CSRF Protection (recommended)
        'enableCsrfProtection' => true,
        'csrfTokenName' => 'APP_CSRF_TOKEN',
        // Some hosting environments may use the sendPoweredByHeader to route requests accordingly
        // Check before disabling, to not negate performance in production
        'sendPoweredByHeader' => false,
        'phpSessionName' => 'SessionId',

        'blowfishHashCost' => 16,

        // sessions
        'userSessionDuration' => 'P1D',
        'rememberedUserSessionDuration' => 'P1W',
        'rememberUsernameDuration' => 'P1M',
        'verificationCodeDuration' => 'P1D',
        'preventUserEnumeration' => true,

        /*
            Uploads
         */
        'maxUploadFileSize' => 32 * 1024 * 1024,
        'convertFilenamesToAscii' => true,

        /**
         * Search
         */

        // Enable fuzzy search by default
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],

        /**
         * Time & date
         */

        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,
        // Timezone
        'timezone' => 'Europe/London',
    ],

    // Dev environment settings
    'development' => [
        // Debugging
        'useCompressedJs' => false,

        // Member login info duration
        // http://www.php.net/manual/en/dateinterval.construct.php
        'userSessionDuration' => 'P101Y',
        'rememberedUserSessionDuration' => 'P101Y',
        'rememberUsernameDuration' => 'P101Y',

        'backupOnUpdate' => false,
        'restoreOnUpdateFailure' => false,
    ],

    // Staging environment settings
    'staging' => [],

    // Production environment settings
    'production' => [
        'allowAdminChanges' => false,
    ],
];
