import json

from rest_framework import permissions


class IsAuthedPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        body = json.loads(request.body)
        print(body['isAuthed'])
        return bool(body['isAuthed'] == True)
