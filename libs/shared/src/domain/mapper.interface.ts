export interface IMapper<DomainEntity, DbRecord> {
  toPersistence(domain: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(domain: DomainEntity);
}
