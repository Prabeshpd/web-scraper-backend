import dotenv from 'dotenv';

type ENV = 'local' | 'test';
interface Configuration {
  env: ENV;
  port: string | number;
  secret: string;
  cors: {
    whitelist: string[];
  };
  logger: {
    prettyPrint: boolean;
  };
  auth: {
    saltRounds: string;
    refreshTokenSecret: string;
    refreshTokenDuration: string;
    accessTokenDuration: string;
    accessTokenSecret: string;
  };
  database: {
    test: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
    local: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
  };
  redis: {
    test: {
      port: number;
      host: string;
      namespace: string;
      password: string;
    };
    local: {
      port: number;
      host: string;
      namespace: string;
      password: string;
    };
  };
  rabbitMQ: {
    test: {
      host: string;
      port: number;
    };
    local: {
      host: string;
      port: number;
    }
  }
}

dotenv.config();

const config: Configuration = {
  secret: process.env.SECRET_KEY || '',
  env: process.env.ENV == 'test' ? 'test' : 'local',
  port: process.env.EXPRESS_PORT || '3000',
  cors: {
    whitelist: ['/^localhost$/']
  },
  logger: {
    prettyPrint: process.env.ENV !== 'production'
  },
  auth: {
    saltRounds: '11',
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'ENTER_ACCESS_TOKEN_SALT_HERE',
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'ENTER_REFRESH_TOKEN_SALT_HERE',
    accessTokenDuration: process.env.AUTH_ACCESS_TOKEN_DURATION || '300000',
    refreshTokenDuration: process.env.AUTH_REFRESH_TOKEN_DURATION || '86400000'
  },
  database: {
    test: {
      host: process.env.DB_TEST_HOST || 'localhost',
      port: (process.env.DB_TEST_PORT && +process.env.DB_TEST_PORT) || 5432,
      user: process.env.DB_TEST_USER || 'postgres',
      password: process.env.DB_TEST_PASSWORD || 'Admin@1234',
      database: process.env.DB_TEST_DATABASE || 'scraper'
    },
    local: {
      host: process.env.DB_HOST || 'localhost',
      port: (process.env.DB_PORT && +process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Admin@1234',
      database: process.env.DB_DATABASE || 'scraper'
    }
  },
  redis: {
    test: {
      port: +(process.env.REDIS_TEST_PORT || 6379),
      host: process.env.REDIS_TEST_HOST || 'localhost',
      namespace: process.env.REDIS_TEST_NAMESPACE || 'webScraper',
      password: process.env.REDIS_TEST_PASSWORD || 'Admin@1234'
    },
    local: {
      port: +(process.env.REDIS_PORT || 6379),
      host: process.env.REDIS_HOST || 'localhost',
      namespace: process.env.REDIS_NAMESPACE || 'webScraper',
      password: process.env.REDIS_PASSWORD || 'Admin@1234'
    }
  },
  rabbitMQ: {
    test: {
      host: process.env.RABBIT_MQ_HOST || 'localhost',
      port: +(process.env.RABBIT_MQ_PORT || 5672),
    },
    local: {
      host: process.env.RABBIT_MQ_HOST || 'localhost',
      port: +(process.env.RABBIT_MQ_PORT || 5672),
    }
  }
};

export default config;
