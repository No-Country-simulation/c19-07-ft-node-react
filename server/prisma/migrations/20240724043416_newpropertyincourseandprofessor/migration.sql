-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professors"("professor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
