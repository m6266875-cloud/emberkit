import ProjectForm, { type ProjectFormProps } from '@/components/ProjectForm';
export default function EditProjectForm(
  props: ProjectFormProps & { project: NonNullable<ProjectFormProps['project']> },
) {
  return <ProjectForm {...props} />;
}
