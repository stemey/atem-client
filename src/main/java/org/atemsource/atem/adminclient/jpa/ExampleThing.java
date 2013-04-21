package org.atemsource.atem.adminclient.jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ExampleThing {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	/**
	 * really?
	 */
	private boolean yes;

	public boolean isYes() {
		return yes;
	}

	public void setYes(boolean yes) {
		this.yes = yes;
	}
}
