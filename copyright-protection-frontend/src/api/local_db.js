import axios from 'axios';

const localDBUrl = 'http://127.0.0.1:8000/api/v1/';

export function getChapterDetailPublic(id) {
    return axios.get(localDBUrl + `book/${id}/chapter`);
}
export function getChapterListPublic(id,chapter_id) {
    return axios.get(localDBUrl + `book/${id}/chapter/${chapter_id}`);
}
export function postChapterCreate(params, id) {
    return axios.post(localDBUrl + `author/book/${id}/chapter`, params);
}
export function postChapterUpdate(params, id, chapter_id) {
    return axios.put(localDBUrl + `author/book/${id}/chapter/${chapter_id}`, params);
}
export function getChapterList(id) {
    return axios.get(localDBUrl + `author/book/${id}/chapter`);
}
export function getChapterDetail(id, chapter_id) {
    return axios.get(localDBUrl + `author/book/${id}/chapter/${chapter_id}`);
}
