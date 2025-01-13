import { ActorRole } from './../../shares/enum/auth.enum';
import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/models/repositories/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  getConversation({ userId, tourGuideId }) {
    return this.chatRepository.find({
      where: [
        {
          userId,
          tourGuideId,
        },
      ],
      relations: ['user', 'tourGuide'],
    });
  }

  getUserChatted({ userId, role }) {
    const subQuery = this.chatRepository
      .createQueryBuilder('subChat')
      .select('MAX(subChat.id)', 'lastChatId')
      .where(
        `${role === ActorRole.USER ? 'subChat.userId' : 'subChat.tourGuideId'} = :userId`,
        { userId },
      )
      .groupBy('subChat.userId')
      .addGroupBy('subChat.tourGuideId');

    return this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.user', 'user', 'chat.userId = user.id')
      .leftJoinAndSelect(
        'chat.tourGuide',
        'tourGuide',
        'chat.tourGuideId = tourGuide.id',
      )
      .where(`chat.id IN (${subQuery.getQuery()})`)
      .setParameters(subQuery.getParameters())
      .orderBy('chat.id', 'DESC')
      .getMany();
  }

  saveMessage(payload) {
    this.chatRepository.save(payload);
  }
}
