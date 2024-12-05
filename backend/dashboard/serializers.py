from rest_framework import serializers
from .models import Semester, Course, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'course',
            'title',
            'description',
            'due_date',
            'priority',
            'status'
        ]

    def validate_due_date(self, value):
        if value is None:
            raise serializers.ValidationError("Due date is required")
        return value

class CourseSerializer(serializers.ModelSerializer):
    tasks_count = serializers.IntegerField(read_only=True)
    completed_tasks_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'semester', 'code', 'name', 'description', 'credits', 'tasks_count', 'completed_tasks_count']

class SemesterSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    courses_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Semester
        fields = ['id', 'year', 'season', 'is_current', 'courses', 'courses_count']

    def validate_year(self, value):
        if value < 2000 or value > 2100:
            raise serializers.ValidationError("Year must be between 2000 and 2100")
        return value

    def validate_season(self, value):
        valid_seasons = dict(Semester.SEASON_CHOICES).keys()
        if value not in valid_seasons:
            raise serializers.ValidationError(f"Season must be one of {list(valid_seasons)}")
        return value 