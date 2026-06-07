SELECT 
	count(e.clave) as "Numero de entregas 1997",
	sum(e.cantidad) AS "unidades totales",
	sum(e.cantidad * m.precio *(1 + m.porcentajeimpuesto/100)) AS "Importe Total"
FROM public."Entregan" e
JOIN public."Materiales" m ON e.clave = m.clave
WHERE EXTRACT(YEAR FROM e.fecha) = 1997;

SELECT 
	p.razonsocial AS "razonSocial Proveedor",
	sum(e.cantidad * m.precio *(1 + m.porcentajeimpuesto/100)) AS "Importe Total",
	count(*) AS "numeroEntregas"
FROM public."Entregan" e
JOIN public."Proveedores" p ON e.rfc = p.rfc
JOIN public."Materiales" m ON e.clave = m.clave
GROUP by p.razonsocial
ORDER by p.razonsocial;

SELECT 
	m.clave AS "Clave",
	m.descripcion AS "descripcion",
	SUM(e.cantidad) AS "cantidad total",
	MAX(e.cantidad) AS "maxcantidad",
	MIN(e.cantidad) AS "minCantidad",
	sum(e.cantidad * m.precio *(1 + m.porcentajeimpuesto/100)) AS "Importe Total"
FROM public."Entregan" e
JOIN public."Materiales" m ON e.clave = m.clave
GROUP by m.clave, m.descripcion
HAVING AVG(e.cantidad) > 400
ORDER BY m.clave;
	
SELECT
	p.razonsocial AS "RazonSocial",
	AVG(e.cantidad) AS "PromedioCantidad",
	m.clave AS "Clavematerial",
	m.descripcion AS "descripcionMaterial"
FROM public."Entregan" e
JOIN public."Proveedores" p ON p.rfc = e.rfc
JOIN public."Materiales" m ON e.clave = m.clave
GROUP BY p.rfc, p.razonsocial, m.clave
HAVING AVG(e.cantidad) >= 500
ORDER BY m.clave, m.descripcion;

SELECT *
FROM (
    SELECT
        p.razonsocial        AS "Proveedor",
        m.clave              AS "Clave Mat",
        m.descripcion        AS "Material",
        AVG(e.cantidad)      AS "Cantidad Promedio"
    FROM public."Entregan" e
    JOIN public."Proveedores" p ON e.rfc = p.rfc
    JOIN public."Materiales"  m ON e.clave = m.clave
    GROUP BY p.rfc, p.razonsocial, m.clave, m.descripcion
) AS promedios
WHERE "Cantidad Promedio" < 370
   OR "Cantidad Promedio" > 450
ORDER BY "Cantidad Promedio";



