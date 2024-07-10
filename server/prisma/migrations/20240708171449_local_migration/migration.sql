-- CreateTable
CREATE TABLE "Professor" (
    "professor_id" TEXT NOT NULL,
    "area_academica_id" TEXT NOT NULL,
    "fecha_contratacion" TEXT NOT NULL,
    "estado_empleado" TEXT NOT NULL,
    "nivel_educativo_id" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professor_id")
);

-- CreateTable
CREATE TABLE "Areas_academicas" (
    "area_academica_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_educativo" TEXT NOT NULL,

    CONSTRAINT "Areas_academicas_pkey" PRIMARY KEY ("area_academica_id")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "cursos_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "area_academica_id" TEXT NOT NULL,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("cursos_id")
);

-- CreateTable
CREATE TABLE "Academic_records" (
    "historial_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "Academic_records_pkey" PRIMARY KEY ("historial_id")
);

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Areas_academicas"("area_academica_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Areas_academicas"("area_academica_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academic_records" ADD CONSTRAINT "Academic_records_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Cursos"("cursos_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academic_records" ADD CONSTRAINT "Academic_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
