import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Slot, SlotDocument } from '../../schemas/slot.schema';

@Injectable()
export class ShedulerService {

    private readonly logger = new Logger(ShedulerService.name);

    constructor(@InjectModel(Slot.name) private slotModel: Model<SlotDocument>) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {

        const slots = await this.slotModel.find({
            notified: false,
            notifyTime:{ "$lte": new Date() }
        }).populate('customer').exec();
        
        this.logger.debug(`${slots.length} customers need to be notified in advance`);
       
        await this.slotModel.updateMany( {
            _id: { $in: slots.map(({ _id }) => _id) }
        },
        { $set: { notified: true } }).exec();

    }

}
