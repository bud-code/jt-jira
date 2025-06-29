"use server";

import { getMember } from "@/features/members/utils";
import { Project } from "@/features/projects/types";
import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, PROJECTS_ID } from "@/config";

interface GetProjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectProps) => {
  const { account, databases } = await createSessionClient();

  const project = await databases.getDocument<Project>(DATABASE_ID, PROJECTS_ID, projectId);

  const user = await account.get();
  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) return null;

  return project;
};
