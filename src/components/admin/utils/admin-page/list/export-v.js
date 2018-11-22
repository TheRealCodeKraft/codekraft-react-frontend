import React from "react"

export default ({attributes, selectedAttributes, items, csv, onCheck, onDownload}) => (
	<div className="export">
		<span className="title">Sélectionner les colonnes à exporter</span>
		<div className="checkers">
			{ attributes.map(attr => (
					<div className="attr-checker">
						<input 
							type="checkbox"
							name={attr.name} 
							onChange={(e) => { onCheck(attr) }} 
							defaultChecked={selectedAttributes.find(a => a.name == attr.name)} 
						/>
						<label key={`label-for-${attr.name}`} className={`control-label`} htmlFor={attr.name}>{attr.label}</label>
					</div>
			))}		
		</div>

		<span className="title">Visualiser les résultats</span>
		<div className="data-container">
			<div className="data-table">
				{ items.length == 0
					? <div className="no-data">Aucune donnée</div>
					: [
							<div className="row header">
								{ selectedAttributes.map(attr => (
									<div className="cell">{attr.label}</div>
								))}
							</div>,
							items.map(item => (
								<div className="row">
									{ selectedAttributes.map(attr => (
											<div className="cell">
												{ attr.csvWrapper
													? attr.csvWrapper(item[attr.name])
													: attr.wrapper 
														? attr.wrapper(item[attr.name]) 
														: item[attr.name]
												}	
											</div>
									))}
								</div>
							))
						]
				}
			</div>
		</div>

		<div className="export-container">
			<div className="export-action">
				<span className="title">Copier/Coller l'export</span>
				<div className="csv-input-container">
					<textarea row="10" value={csv} spellcheck={false} />
				</div>
			</div>

			<div className="export-action">
				<span className="title">Télécharger un fichier</span>
				<div className="actions">
					<button onClick={onDownload}>Télécharger</button>
				</div>
			</div>
		</div>
	</div>
)
