import Bee from 'bee-queue';
import EnrolmentInformation from '../app/jobs/EnrolmentInformation';
import OrderAnswered from '../app/jobs/OrderAnswered';
import redisConfig from '../config/redis';

const jobs = [EnrolmentInformation, OrderAnswered];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: { redisConfig },
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queuee ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
