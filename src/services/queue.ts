import config from '../config';
import Queue from '../utils/queue';

const processEnv = config.env;
const connectionParameter = config.rabbitMQ[processEnv];
const queue = new Queue(connectionParameter);

export async function sendQueueMessage(queueName: string, message: string) {
  const channel = await queue.createChannel();
  if (!channel) {
    throw new Error('Rabbit MQ not set properly');
  }
  await queue.assertQueue(channel, queueName);
  await queue.sendMessage(channel, queueName, message);
}

export async function bindConnection() {
  const connection = await queue.createConnection();

  queue.bindConnection(connection);
}
