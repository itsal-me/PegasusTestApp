from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from django.core.exceptions import PermissionDenied
from .models import Semester, Course, Task
from .serializers import SemesterSerializer, CourseSerializer, TaskSerializer

# Create your views here.

class SemesterViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SemesterSerializer

    def get_queryset(self):
        return Semester.objects.filter(user=self.request.user).prefetch_related(
            'courses'
        ).annotate(
            courses_count=Count('courses')
        )

    def perform_update(self, serializer):
        # If setting as current semester
        if serializer.validated_data.get('is_current'):
            # First, unset any existing current semester
            self.get_queryset().filter(is_current=True).update(is_current=False)
        serializer.save()

    @action(detail=False, methods=['get'])
    def current(self, request):
        try:
            # Get the first current semester or None
            semester = self.get_queryset().filter(is_current=True).first()
            if semester:
                serializer = self.get_serializer(semester)
                return Response(serializer.data)
            return Response({
                "id": None,
                "year": None,
                "season": None,
                "is_current": False,
                "courses": [],
                "courses_count": 0
            })
        except Exception as e:
            print("Error fetching current semester:", str(e))
            return Response(
                {"error": "Failed to fetch current semester"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def perform_create(self, serializer):
        # If this semester is being set as current, unset any other current semester
        if serializer.validated_data.get('is_current', False):
            self.get_queryset().filter(is_current=True).update(is_current=False)
        serializer.save(user=self.request.user)

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(
            semester__user=self.request.user
        ).select_related('semester').prefetch_related('tasks')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        # Add computed fields manually
        for item in serializer.data:
            course = queryset.get(id=item['id'])
            item['tasks_count'] = course.tasks_count
            item['completed_tasks_count'] = course.completed_tasks_count
            
        return Response(serializer.data)

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(
            course__semester__user=self.request.user
        ).select_related('course')

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        try:
            serializer = self.get_serializer(data=request.data)
            if not serializer.is_valid():
                print("Validation errors:", serializer.errors)
                return Response(
                    {"error": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Exception:", str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        try:
            tasks = self.get_queryset().filter(
                status__in=['TODO', 'IN_PROGRESS']
            ).order_by('due_date')[:5]
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)
        except Exception as e:
            print("Error in upcoming tasks:", str(e))
            return Response(
                {"error": "Failed to fetch upcoming tasks"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
