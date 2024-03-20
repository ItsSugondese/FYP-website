import { paginationPayload } from "@shared/model/pagination/pagination.model"

export interface AnnouncementPayload{
    message: string
}

export interface AnnouncementPaginationPayload extends paginationPayload{
    name ?: string;
    fromDate ?: string;
    toDate ?: string;
}