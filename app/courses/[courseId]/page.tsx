import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CoursePlayer from '../../components/CoursePlayer';
import { getCourse } from '@/lib/courses';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  return <><Navbar /><CoursePlayer course={course} /><Footer /></>;
}
