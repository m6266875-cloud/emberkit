import ProjectForm, { type ProjectFormProps } from '@/components/ProjectForm';
export default function CreateProjectForm(props: Omit<ProjectFormProps, 'project'>) {
  return <ProjectForm {...props} />;
}
