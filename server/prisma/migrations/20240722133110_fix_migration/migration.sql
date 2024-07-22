-- CreateTable
CREATE TABLE "_CoursesToStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToStudents_AB_unique" ON "_CoursesToStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToStudents_B_index" ON "_CoursesToStudents"("B");

-- AddForeignKey
ALTER TABLE "_CoursesToStudents" ADD CONSTRAINT "_CoursesToStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("cursos_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToStudents" ADD CONSTRAINT "_CoursesToStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
