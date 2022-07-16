from rest_framework import permissions

class IsAuthedPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.isAuthed == True)
